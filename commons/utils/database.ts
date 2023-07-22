import { IToken } from "@/commons/entities";

const DB_NAME: string = "ensaware";
const OBJECT_STORE_NAME: string = "token";

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open(DB_NAME, 1);

		request.onerror = () => {
			reject(new Error("Error opening database"));
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			resolve(db);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
				const objectStore = db.createObjectStore(OBJECT_STORE_NAME, {
					keyPath: "id",
				});
				objectStore.createIndex("tokenIndex", "id", { unique: true });
			}
		};
	});
}

export async function saveToken(token: IToken): Promise<IToken> {
	token.id = "ensaware_token_id";
	const db = await openDB();
	const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
	const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

	objectStore.put(token);

	return token;
}

export async function getToken(): Promise<IToken | null> {
	const db = await openDB();
	const transaction = db.transaction(OBJECT_STORE_NAME, "readonly");
	const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

	const request = objectStore.getAll();

	return new Promise((resolve, reject) => {
		request.onsuccess = () => {
			const item = request.result as IToken[];
			resolve(item[0]);
		};

		request.onerror = () => {
			reject(null);
		};
	});
}

export async function deleteToken(): Promise<void> {
	const db = await openDB();
	const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
	const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

	objectStore.clear();
}
