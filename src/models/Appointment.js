const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medico: { type: String, required: true },
  dataHora: { type: Date, required: true },
  status: { type: String, enum: ['agendado', 'cancelado', 'concluido'], default: 'agendado' },
  endereco: {
    cep: String,
    logradouro: String,
    bairro: String,
    cidade: String,
    uf: String
  },
  previsaoChuva: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);