import mongoose from 'mongoose';

export default (): void => {
  const connect = () => {
    mongoose
      .connect('mongodb://mysqldb/tasks:27018', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
      .then(() => {
        return console.log(`Successfully connected to database`);
      })
      .catch(error => {
        console.log('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
