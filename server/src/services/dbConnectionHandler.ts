import {
  Connection,
  createConnection,
  getConnection
} from 'typeorm';
import ORMConfig from '../config/orm.config';

export const DBConnection = async () => {
  let connection: Connection | undefined;

  try {
    connection = getConnection();
  } catch (error) {
    console.log(error);
  }

  try {
    if(connection) {
      if(!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(ORMConfig)
    }
    console.log('DB connection successfull');
  } catch (error) {
    console.error('ERROR: DB connection failed', error);
    throw error;
  }
};

export const ConnectDB = async (onError: Function, next?: Function) => {
  try {
    await DBConnection();
    if(next) {
      next();
    }
  } catch (error) {
    onError();
  }
}