import { apiEnv, apiBaseUrl } from '../../app.json';
import Api from './Api';
import sha1 from 'sha1';
import { CachesDirectoryPath, DocumentDirectoryPath, downloadFile, exists } from 'react-native-fs';

export default class Files {
  static getCachesDirectoryPath() {
    return CachesDirectoryPath;
  }

  static getDocumentDirectoryPath() {
    return DocumentDirectoryPath;
  }

  static downloadFile(url) {
    return new Promise((fulfill, reject) => {
      const fromUrl = Api.url(url);

      const toFile = `${this.getCachesDirectoryPath()}/${sha1(url)}`;

      exists(toFile).then((isFileExists) => {
        if (isFileExists) {
          return fulfill(toFile);
        }

        const downloadFileResponse = downloadFile({
          fromUrl,
          toFile,
          background: true,
          progressDivider: 1,
        });

        return downloadFileResponse.promise
          .then(
            () => fulfill(toFile),
            (e) => reject(e)
          )
          .catch((e) => reject(e));
      });
    });
  }
}
