import { useState, useEffect } from "preact/hooks";

interface Props {
	size: number;
	children: string;
}

const TypeText = (props: Props) => (
	<div
		className={`inline after:inline-block after:h-[${props.size * 0.5}px]
	after:ml-1 after:border after:border-gray-800 after:contents after:animate-blink`}>
		{props.children}
	</div>
);

interface BlinkProps {
	text: string;
	size: number;
	speed: number;
	wait: number;
	handleFinish: () => void;
}

const TypingEffect = ({ text, size = 100, speed = 100, wait = 1000, handleFinish }: BlinkProps) => {
	// Current text inside the effect
	const [blinkT, setBlinkT] = useState("");
	// 1 if length of blinkT == text.length, 0 if length of blinkT == 0
	const [status, setStatus] = useState(0);
	useEffect(() => {
		if (status === 0) {
			if (text.length >= 0 && blinkT.length < text.length) {
				if (blinkT.length !== 0) {
					setTimeout(() => {
						setBlinkT(blinkT + text[blinkT.length]);
					}, speed);
				} else {
					setTimeout(() => {
						setBlinkT(text[0]);
					}, speed);
				}
			}
			if (blinkT.length === text.length) {
				// When text is typed, wait "wait" seconds before deleting it
				setTimeout(() => {
					setStatus(1);
				}, wait);
			}
		} else {
			//reverse status === 1
			if (text.length > 0 && blinkT.length > 0) {
				setTimeout(() => {
					setBlinkT(blinkT.slice(0, blinkT.length - 1));
				}, speed);
			}
			if (blinkT.length === 0) {
				setStatus(0);
				handleFinish();
			}
		}
	}, [blinkT, text, speed, status, handleFinish, wait]);
	return <TypeText size={size}>{blinkT}</TypeText>;
};

export default TypingEffect;
