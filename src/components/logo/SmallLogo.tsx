
const SmallLogo = ({ size }: { size: string }) => (
	<img
		src={"/static/branding/logo.png"}
		alt="Orange gradient with the letters 'CPP' overlayed on it"
		className={`w-${size} h-${size} w-[2rem] h-[2rem]`}
	/>
);

export default SmallLogo;
