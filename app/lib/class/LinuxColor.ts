class LinuxColor {
	public default = (): string => "\u001b[0m";
	public black = (): string => "\u001b[30m";
	public gray = (): string => "\u001b[1;30m";
	public red = (): string => "\u001b[31m";
	public green = (): string => "\u001b[32m";
	public brown = (): string => "\u001b[33m";
	public yellow = (): string => "\u001b[1;33m";
	public blue = (): string => "\u001b[34m";
	public lightBlue = (): string => "\u001b[1;34m";
	public purple = (): string => "\u001b[35m";
	public cyan = (): string => "\u001b[36m";
	public white = (): string => "\u001b[37m";
}

export default new LinuxColor();
