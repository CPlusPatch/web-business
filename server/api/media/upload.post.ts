import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export default defineEventHandler(async event => {
	if (
		!process.env.S3_ENDPOINT ||
		!process.env.S3_ACCESS_KEY ||
		!process.env.S3_SECRET_ACCESS_KEY ||
		!process.env.S3_BUCKET_NAME
	) {
		return abortNavigation({
			statusCode: 500,
			statusMessage:
				"Misconfigured server: S3 environment variables are invalid",
		});
	}

	const S3 = new S3Client({
		region: "auto",
		endpoint: process.env.S3_ENDPOINT,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY ?? "",
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
		},
	});

	const body = await readMultipartFormData(event);
	const file = body![0];


	const command = new PutObjectCommand({
		Bucket: process.env.S3_BUCKET_NAME,
		Key: file.filename,
		Body: file.data,
		ContentType: file.type,
	});

	const response = await S3.send(command);

	if (response.$metadata.httpStatusCode === 200) {
		return `${process.env.CDN_URL}/${file.filename}`;
	} else {
		return abortNavigation({
			statusCode: 500
		});
	}
});
