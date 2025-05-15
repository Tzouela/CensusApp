const db = require("../models");

class ParticipantService {
  constructor() {
    this.Participant = db.Participant;
    this.WorkDetails = db.WorkDetails;
    this.HomeDetails = db.HomeDetails;
    this.sequelize = db.sequelize;
  }

  async addParticipant({ participant, work, home }) {
    const created = await this.Participant.create(
      { ...participant, work, home },
      {
        include: ['work', 'home']
      }
    );
    return created;
  }

  async listParticipants() {
    return this.Participant.findAll({ include: ['work', 'home'] 
    });
  }

  async detailsAll() {
    return this.Participant.findAll({
      attributes: ['firstname', 'lastname', 'email']
    });
  }

  async detailsByEmail(email) {
    const p = await this.Participant.findByPk(email, {
      attributes: ['firstname', 'lastname', 'dob', 'email']
    });
    if (!p) throw { status: 404, message: 'Participant not found' 
    };
   return p;
  }

  async workByEmail(email) {
    const w = await this.WorkDetails.findOne({
      where: { email },
      attributes: ['companyname', 'salary', 'currency']
    });
    if (!w) throw { status: 404, message: 'Work details not found' };
    return w;
  }

  async homeByEmail(email) {
    const h = await this.HomeDetails.findOne({
      where: { email },
      attributes: ['country', 'city']
    });
    if (!h) throw { status: 404, message: 'Home details not found' };
    return h;
  }

  async updateParticipant(email, { participant, work, home }) {
    return this.sequelize.transaction(async (t) => {
      const p = await this.Participant.findByPk(email, { 
         transaction: t });
      if (!p) throw { status: 404, message: 'Participant not found' };
      await p.update(participant, { transaction: t });
      await this.WorkDetails.update(work, { where: { email }, 
         transaction: t });
      await this.HomeDetails.update(home, { where: { email }, 
         transaction: t });
      return this.Participant.findByPk(email, {
        include: ['work', 'home'],
        transaction: t
      });
    });
  }

  async deleteParticipant(email) {
    const count = await this.Participant.destroy({ where: { email } });
    if (!count) throw { status: 404, message: 'Participant not found' };
  }
}


module.exports = ParticipantService;