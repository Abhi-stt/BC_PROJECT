const User = require('./user.schema');
const Post = require('./post.schema');
const Report = require('./report.schema');
const { getIO } = require('./socket');

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true, status: 'active' },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    getIO().emit('userUpdated', { userId: user._id, user });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.suspendUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'suspended' },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    getIO().emit('userUpdated', { userId: user._id, user });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    getIO().emit('userUpdated', { userId: user._id, user });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.premiumUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isPremium: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    getIO().emit('userUpdated', { userId: user._id, user });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    getIO().emit('userDeleted', { userId: req.params.id });
    res.json({ message: 'User deleted', userId: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approvePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    getIO().emit('postUpdated', { postId: post._id, post });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    getIO().emit('postUpdated', { postId: post._id, post });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    getIO().emit('postDeleted', { postId: req.params.id });
    res.json({ message: 'Post deleted', postId: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resolveReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: 'resolved' },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: 'Report not found' });
    getIO().emit('reportUpdated', { reportId: report._id, report });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reviewReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: 'reviewed' },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: 'Report not found' });
    getIO().emit('reportUpdated', { reportId: report._id, report });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 