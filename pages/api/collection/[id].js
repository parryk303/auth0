import SSA from '../../../models/SSA';
import mongoose from 'mongoose';

const connection = {};

const dbconnect = async () => {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected)
}

dbconnect();

const formRoute = async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const ssa = await SSA.findById(id);
        if (!ssa) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: ssa })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'PUT':
      try {
        const ssa = await SSA.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!ssa) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: ssa })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'DELETE':
      try {
        const deletedSSA = await SSA.deleteOne({ _id: id });
        if (!deletedSSA) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}

export default formRoute;