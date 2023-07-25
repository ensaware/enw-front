import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const useCreateHook = () => {
	const webcamRef = useRef<Webcam>(null);
  	const [imgSrc, setImgSrc] = useState<string | null | undefined>(null);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot();
		setImgSrc(imageSrc);
	}, [webcamRef, setImgSrc]);

	return {
		capture,
		imgSrc
	}
}

export { useCreateHook };
