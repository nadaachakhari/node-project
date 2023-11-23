const { Event, eventValidation } = require('../models/Event');

const addEvent = async (req, res) => {
  try {
    // Valider les données de la requête avec Joi
    const { error } = eventValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Créer un nouvel événement
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      event,
      message: 'Événement créé avec succès!',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEvent };
