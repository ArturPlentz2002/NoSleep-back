import * as admin from 'firebase-admin';
import * as path from 'path';
// Defina aqui o caminho para seu arquivo JSON de Service Account.
// Ajuste conforme o local exato dentro de src/ ou na raiz do projeto.
const serviceAccountPath = path.join(__dirname, 'service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  // Caso use Realtime Database ou outras features, acrescente databaseURL:
  // databaseURL: 'https://<SEU-PROJETO>.firebaseio.com',
});

// Exporta instância do Firestore para uso nas controllers
export const db = admin.firestore();
