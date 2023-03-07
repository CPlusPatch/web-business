import SmallLogo from "./SmallLogo";

const LongLogo = ({ size }: { size: string; }) => (
	<span className={`flex gap-2 items-center text-xl font-semibold font-inter h-${size} duration-150 ease-in-out hover:scale-[102%] active:scale-95`}>
		<SmallLogo size={size}/>
		CPlusPatch
	</span>
);

export default LongLogo;