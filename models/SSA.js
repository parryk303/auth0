const mongoose = require('mongoose');

const SSASchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [15, 'Title cannot be more than 15 characters']
  },
  NextGenSOC: [{ type: String }],
  SocKPI: [{ type: String }],
  UtilizationNormalization: [{ type: String }],
  UseCase: [{ type: String }],
  Enrichment: [{ type: String }],
  Itp: [{ type: String }],
  ThreatHunting: [{ type: String }],
  VulnerabilityManagement: [{ type: String }],
  ThreatIntelligence: [{ type: String }],
  DataMasking: [{ type: String }],
  Soar: [{ type: String }],
  Process: [{ type: String }],
  SocStaff: [{ type: String }],
  TrainingAccredidation: [{ type: String }],
  Dfir: [{ type: String }],
  FraudPrevention: [{ type: String }],
  RedBluePurple: [{ type: String }],
  SecurityMangement: [{ type: String }],
  Risk: [{ type: String }],
  OnCall: [{ type: String }],
  PhysicalSecurity: [{ type: String }],
});

module.exports = mongoose.models.SSA || mongoose.model('SSA', SSASchema);
