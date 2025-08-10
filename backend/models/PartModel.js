import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({

});

const Part = mongoose.model("Part", partSchema);

export default Part;
