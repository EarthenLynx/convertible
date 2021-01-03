module.exports = {
	convertOptions: [
		{
			key: 'png',
			value: 'PNG',
		},
		{
			key: 'jpg',
			value: 'JPG',
		},
		{
			key: 'webp',
			value: 'WebP',
		},
		{
			key: 'pdf',
			value: 'Pdf',
		},
	],

	qualityOptions: [
		{
			key: 100,
			value: 'Original (100%)',
		},
		{
			key: 80,
			value: 'For blogging (80%)',
		},
		{
			key: 60,
			value: 'Quality size tradeoff (60%)',
		},
		{
			key: 40,
			value: 'Harddrive-friendly (40%)',
		},
		{
			key: 20,
			value: 'Pixel graveyard (20%)',
		},
	],

	fixedRatioOptions: [
		{
			key: undefined,
			value: 'Manual',
		},
		{
			key: 'hd',
			value: 'Landscape 16:9 format',
		},
		{
			key: 'classic',
			value: 'Classic 4:3 format',
		},
		{
			key: 'square',
			value: 'Square 1:1 format',
		},
	],
};
