// import {
//   app,
//   HttpRequest,
//   HttpResponseInit,
//   InvocationContext,
// } from "@azure/functions";
// import CommonUtil from "../util/common-util";
// import * as archiver from "archiver";
// import { AppConstants } from "../constant/app-constant";
// import * as streamBuffers from "stream-buffers";
// import { BlobServiceClient } from "@azure/storage-blob";
// import * as Client from "ssh2-sftp-client";

// export async function processCreatingZipFile(
//   request: HttpRequest,
//   context: any
// ): Promise<HttpResponseInit> {
//   const requestData: any = await request.json();
//   const tbFileContent: string = requestData.tbFileContent;
//   const tbFileName: string = requestData.tbFileName;
//   const accountingDate: string = requestData.accountingDate;
//   const decodedFileContent = Buffer.from(tbFileContent, "base64");

//   const zipFileName = `${AppConstants.TB_FILE_PREFIX}${CommonUtil.getDate(
//     accountingDate,
//     AppConstants.DD_MM_YYYY_FORMAT
//   )}${AppConstants.CSV_ZIP}`;

//   const zipBuffer = await createZipFile(decodedFileContent, tbFileName);

//   const sftp = new Client();
//   const sftpConfig = {
//     host: process.env.SFTP_HOST,
//     port: 22,
//     username: process.env.SFTP_USERNAME,
//     password: process.env.SFTP_PASSWORD,
//   };

//   try {
//     await sftp.connect(sftpConfig);

//     const uploadStream = sftp.createWriteStream(`/GTL/${zipFileName}`);

//     uploadStream.on("error", (err: any) =>
//       console.error(`Error in SFTP Stream: ${err}`)
//     );

//     uploadStream.on("finish", async () => {
//       console.log("SFTP Stream finished writing");
//       try {
//         await sftp.end();
//         console.log("SFTP connection closed");
//       } catch (err) {
//         console.error(`Error during sftp end: ${err}`);
//       }
//     });

//     uploadStream.end(zipBuffer);
//   } catch (err) {
//     console.error(`Error during SFTP transfer: ${err}`);
//     try {
//       await sftp.end();
//     } catch (err) {
//       console.error(`Error during sftp end: ${err}`);
//     }
//   }

//   context.res = {
//     body: {
//       zipFileContent: zipBuffer.toString("base64"),
//     },
//   };

//   return {
//     status: 200,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: zipBuffer.toString("base64"),
//   };
// }

// function createZipFile(tbFileContent: Buffer, tbFileName: string) {
//   return new Promise<Buffer>((resolve, reject) => {
//     const archive = archiver("zip");
//     const bufferStream = new streamBuffers.WritableStreamBuffer();

//     bufferStream.on("finish", () => {
//       resolve(bufferStream.getContents() as Buffer);
//     });

//     archive.on("error", (error) => {
//       reject(error);
//     });

//     archive.pipe(bufferStream);
//     archive.append(tbFileContent, { name: `${tbFileName}` });
//     archive.finalize();
//   });
// }

// app.http("create-zip-file", {
//   methods: ["GET", "POST"],
//   authLevel: "anonymous",
//   handler: processCreatingZipFile,
// });
