import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Role } from "~/db/entities/User";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	if (user?.role !== Role.ADMIN) {
		throw createError({
			statusCode: 401,
		});
	}

	const config = getConfig();

	if (
		!config.s3.endpoint ||
		!config.s3.access_key ||
		!config.s3.secret_access_key ||
		!config.s3.bucket_name ||
		!config.s3.public_url
	) {
		return abortNavigation({
			statusCode: 500,
			statusMessage: "Misconfigured server: S3 config is invalid",
		});
	}

	const S3 = new S3Client({
		region: "auto",
		endpoint: config.s3.endpoint,
		credentials: {
			accessKeyId: config.s3.access_key ?? "",
			secretAccessKey: config.s3.secret_access_key ?? "",
		},
	});

	const body = await readMultipartFormData(event);
	const file = body![0];

	const command = new PutObjectCommand({
		Bucket: config.s3.bucket_name,
		Key: file.filename,
		Body: file.data,
		ContentType: file.type,
	});

	const response = await S3.send(command);

	if (response.$metadata.httpStatusCode === 200) {
		return `${config.s3.public_url}/${file.filename}`;
	} else {
		return abortNavigation({
			statusCode: 500,
		});
	}
});
