export const utils = {};

utils.getElem = (string, imdbID) => {
	return document.getElementById(string + imdbID);
};
