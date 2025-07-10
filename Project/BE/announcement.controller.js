const Announcement = require('./announcement.schema');
const { getIO } = require('./socket');

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    getIO().emit('announcementCreated', { announcement });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ timestamp: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.activateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    announcement.isActive = !announcement.isActive;
    await announcement.save();
    getIO().emit('announcementUpdated', { announcement });
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    getIO().emit('announcementDeleted', { announcementId: req.params.id });
    res.json({ message: 'Announcement deleted', announcementId: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 