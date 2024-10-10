// src/utils/idGenerator.ts

const getNewComponentId = (() => {
	const elementMap: { [k: string]: number } = {};

	return (k: string) => {
		if (!elementMap[k]) elementMap[k] = 0;
		elementMap[k]++;
		return `p-${k}-${elementMap[k]}`;
	};
})();

export { getNewComponentId };
