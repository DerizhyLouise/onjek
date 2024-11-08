tailwind.config = {
	theme: {
		extend: {
			colors: {
				black: "#013220",
				darkgreen: "#014421",
				green: "#355E3B",
				sage: "#BCB88A",
				cuswhite: "#FBFBFB",
			},
		},
	},
};

const session = sessionStorage.getItem("userId");
if (
	!session &&
	!window.location.pathname.startsWith("/login") &&
	!window.location.pathname.startsWith("/register")
) {
	alert("Session expired!");
	window.location.href = "/login";
}
