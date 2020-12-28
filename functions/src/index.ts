import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
//초기화
const db = admin.firestore();
//관리자 권한으로 firestore 열람

const sendResponse = (
  response: functions.Response,
  statusCode: number,
  body: any
) => {
  response.send({
    statusCode,
    body: JSON.stringify(body)
  })
}
//응답용 메소드

export const addDataset = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response<any>) => {
    if (req.method !== 'POST') {
      sendResponse(res, 405, { error: 'Invalid Request!' })
    } else {
      const dataset = req.body;
      for (const key of Object.keys(dataset)) {
        const data = dataset[key];
        await db.collection('questions').doc(key).set(data);
      }
      //db의 collection('questions')의 document(key)에 data를 넣는다
      sendResponse(res, 200, { message: 'Successfully added dataset!' })
    }
  })
