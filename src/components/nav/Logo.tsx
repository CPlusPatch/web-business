import LongLogo from "../logo/LongLogo";
import SmallLogo from "../logo/SmallLogo";

export function Logo() {
	return (
		<>
			<div className="hidden justify-center items-center md:flex">
				<LongLogo size="8" />
			</div>
			<div className="flex justify-center items-center md:hidden">
				<SmallLogo size="8" />
			</div>
		</>
	);
}
