Upload a photo and get a haiku

1. Filestack - to upload a photo

2. Google Cloud Vision - analyse a photo and come up with set of words associated with photo

Documentation:
https://cloud.google.com/vision/

Post request:
https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY

{
  "requests":[
    {
      "image":{
        "source":{
          "imageUri":
            "image.jpg"
        }
      },
      "features":[
        {
          "type":"LABEL_DETECTION",
          "maxResults":10
        }
      ]
    }
  ]
}

Response:

{
	"responses": [
		{
			"labelAnnotations": [
				{
					"mid": "/m/034z7h",
					"description": "cityscape",
					"score": 0.9672591,
					"topicality": 0.9672591
				},
				{
					"mid": "/m/01bqvp",
					"description": "sky",
					"score": 0.9378023,
					"topicality": 0.9378023
				},
				{
					"mid": "/m/0204fg",
					"description": "skyline",
					"score": 0.9254783,
					"topicality": 0.9254783
				},
				{
					"mid": "/m/039jbq",
					"description": "urban area",
					"score": 0.9182953,
					"topicality": 0.9182953
				},
				{
					"mid": "/m/01n32",
					"description": "city",
					"score": 0.91389555,
					"topicality": 0.91389555
				},
				{
					"mid": "/m/079cl",
					"description": "skyscraper",
					"score": 0.9060412,
					"topicality": 0.9060412
				},
				{
					"mid": "/m/05_5t0l",
					"description": "landmark",
					"score": 0.8866002,
					"topicality": 0.8866002
				},
				{
					"mid": "/m/015kr",
					"description": "bridge",
					"score": 0.8714855,
					"topicality": 0.8714855
				},
				{
					"mid": "/m/056mk",
					"description": "metropolis",
					"score": 0.8482781,
					"topicality": 0.8482781
				},
				{
					"mid": "/m/0838f",
					"description": "water",
					"score": 0.8148126,
					"topicality": 0.8148126
				}
			]
		}
	]
}

3. Datamuse - process the words, find related words and number of syllables

Documentation:
https://www.datamuse.com/api/

Get request:
https://api.datamuse.com/words?rel_jjb=cityscape&md=s&max=10

Response:

[
	{
		"word": "modern",
		"score": 1001,
		"numSyllables": 2
	},
	{
		"word": "new",
		"score": 1000,
		"numSyllables": 1
	},
	{
		"word": "urban",
		"score": 999,
		"numSyllables": 2
	},
	{
		"word": "american",
		"score": 998,
		"numSyllables": 4
	},
	{
		"word": "contemporary",
		"score": 997,
		"numSyllables": 5
	},
	{
		"word": "entire",
		"score": 996,
		"numSyllables": 3
	},
	{
		"word": "parisian",
		"score": 995,
		"numSyllables": 3
	},
	{
		"word": "industrial",
		"score": 994,
		"numSyllables": 4
	},
	{
		"word": "roman",
		"score": 993,
		"numSyllables": 2
	},
	{
		"word": "traditional",
		"score": 992,
		"numSyllables": 4
	}
]

4. Finally
Take these words and stick them into a haiku template (from a randomised set of haiku templates, made by myself). Display image and haiku.



1.
In the twilight rain
these brilliant-hued hibiscus -
A lovely sunset
Matsuo Basho

2.
The shallows-
a crane’s thighs splashed
in cool waves
Matsuo Basho
