"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const downloadFile = (bucketName, srcFilename, destFilename) => {
    const storage = new storage_1.Storage();
    const options = {
        destination: destFilename,
    };
    storage
        .bucket(bucketName)
        .file(srcFilename)
        .download(options);
};
downloadFile('envvars_order-api', '.env.prod', '.env.prod');
