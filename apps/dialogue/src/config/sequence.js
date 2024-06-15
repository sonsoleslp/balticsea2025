export let sequence = {
	question: "Hi, how can I help you?", 
	answers: [
		{
			answer:"I know what’s wrong with Bob! It’s cyanide! ", 
			question: "How could cyanide make Bob ill? Surely, he has not been exposed to large quantities…", 
			answers: [
				{
					question: "Alright...", 
					answer:"I don’t know. I’ll have to figure out if he is somehow more sensitive than others"
				},
				{
					question: "I’m afraid you are mistaken. Bob does not have missense mutation in rhodanese gene. I don’t think this explains his condition. Please let me work in peace unless you come up with a better idea", 
					answer:"Even tiny amounts of cyanide could be lethal for Bob as he has a missense mutation in rhodanese gene slowing down cyanide metabolism! "
				},
				{
					question: "I’m afraid you are mistaken. Chromosome 21 trisomy leads to Down’s Syndrome. I don’t think this explains his condition. Please let me work in peace unless you come up with a better idea", 
					answer:"Even tiny amounts of cyanide could be lethal for Bob as he has chromosome 21 trisomy which is associated with cyanide sensitivity!"
				},
				{
					question: "“I see. How was Bob exposed to cyanide then?", 
					answer:"Even tiny amounts of cyanide could be lethal for Bob as he carries a rare GST polymorphism that is associated with cyanide metabolism!” (discovered article in lab linking GST with cyanide + Bob’s genetic test results) ", 
					answers: [
						{	
							answer:"It’s the cyanobacteria in Baltic Sea! He got exposed while swimming",
							question: "“I’m afraid you are mistaken. Blue algae do not contain cyanide. Please let me work in peace unless you come up with a better idea"
						},
						{	
							answer:"It’s the cyanide in plum seeds! He got exposed when eating plum jam!",
							question: "Is that possible? Let me check .... You are right! Plum seed together with Bob’s GST polymorphism are the answer! We are just working on an experimental cure for cyanide poisoning and have our first batch of antidote ready!"
						},
						{	
							answer:"It’s the cyanobacteria in Baltic Sea! He was throwing sea water to stones in sauna!",
							question: "I’m afraid you are mistaken. Although it’s not a good idea to throw sea water to stones in sauna, cyanobacteria do not contain cyanide. Please let me work in peace unless you come up with a better idea"
						},
						{	
							question: "I’m afraid you are mistaken. Although cyanide was used in insecticides long time ago, they are now free of cyanide. Please let me work in peace unless you come up with a better idea",
							answer:"It’s the cyanide from the insecticide! He used it to repel ticks and mosquitos!"
						}

					]
				}
			]},
		{
			answer:"I know what’s wrong with Bob! He got bit by tick while we were camping", 
			question: "Which tick-borne disease do you mean?", 
			answers: [
				{
					question: "That cannot be right. Tick-borne diseases take longer time to develop. Please let me work in peace unless you come up with a better idea", 
					answer:"It’s the Lyme disease! "
				},
				{
					question: "That cannot be right. Tick-borne diseases take longer time to develop. Please let me work in peace unless you come up with a better idea", 
					answer:"It’s Tick-borne encephalitis!"
				},
				{
					question: "Come on, get out of here!", 
					answer:"It's COVID-19!"},
				{
					question: "Alright, please let me work in peace unless you come up with a better idea", 
					answer:"I still don't know"}
			]
		},
		{
			answer:"I know what’s wrong with Bob! It’s the fish he ate!",	
			question: "An acute food poisoning? Interesting, was he the only person eating the fish?”", 
			answers: [
				{
					answer:"No, we all had fish.",
					question: "Then I don’t think eating fish has gotten Bob ill. If fish had gone bad others would have symptoms by now as well. Please let me work in peace unless you come up with a better idea"
				},
				{
					answer:"I can’t recall. I’ll have to check if there are photos of the barbeque…",
					question: "Bye then", 
				}
			]
		},
		{
			question: "Okay...bye", 
			answer:"Sorry! Wrong room"
		}
	]
}
