const Appointment = require('../models/Appointment');
const axios = require('axios');

const criar = async (req, res) => {
  try {
    const { medico, dataHora, cep } = req.body;

    const conflito = await Appointment.findOne({ medico, dataHora, status: 'agendado' });
    if (conflito) return res.status(400).json({ erro: 'Horário já ocupado para este médico' });

    let endereco = {};
    if (cep) {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!data.erro) {
        endereco = { cep, logradouro: data.logradouro, bairro: data.bairro, cidade: data.localidade, uf: data.uf };
      }
    }

    let previsaoChuva = false;
    if (process.env.OPENWEATHER_API_KEY && endereco.cidade) {
      try {
        const clima = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${endereco.cidade}&appid=${process.env.OPENWEATHER_API_KEY}&lang=pt_br`
        );
        const dataConsulta = new Date(dataHora).toDateString();
        previsaoChuva = clima.data.list.some(item => {
          const itemData = new Date(item.dt * 1000).toDateString();
          return itemData === dataConsulta && item.weather[0].main === 'Rain';
        });
      } catch (_) {}
    }

    const agendamento = await Appointment.create({
      paciente: req.user.id,
      medico,
      dataHora,
      endereco,
      previsaoChuva
    });

    res.status(201).json({ agendamento, previsaoChuva });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const listar = async (req, res) => {
  try {
    const filtro = req.user.perfil === 'secretario' ? {} : { paciente: req.user.id };
    const agendamentos = await Appointment.find(filtro).populate('paciente', 'nome email').sort({ dataHora: 1 });
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const cancelar = async (req, res) => {
  try {
    const ag = await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelado' }, { new: true });
    if (!ag) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    res.json({ mensagem: 'Cancelado com sucesso', ag });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { criar, listar, cancelar };
