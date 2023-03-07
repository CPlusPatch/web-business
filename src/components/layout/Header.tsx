import { createElement } from "preact";
import { classNames } from "../../utils/functions";

const Header = ({ type, size = "", className = "", children }: {
	type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	size?: string;
	children: any;
	className?: string
}) => {
	return createElement(
		type,
		{
			className:
				classNames(`mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl ${size}`, className),
		},
		children
	);
		
}

export default Header;