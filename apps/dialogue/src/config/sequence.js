export let sequence = {
	question: "Hello, how can I help you?", 
	answers: [
		{
			answer:"I know what's wrong with Alex! They're suffering from cyanide poisoning!", 
			question: "How could cyanide have been the cause of Alex's illness? Surely, they haven't been exposed to sufficiently large quantities", 
			answers: [
				{
					question: "Alright...", 
					answer:"I don't know. I'll have to work out whether they are more sensitive to cyanide than others."
				},
				{
					question: "I'm afraid you are mistaken. Alex does not have missense mutation in rhodanese gene. I don't think this explains his condition. Please let me work in peace unless you come up with a better idea", 
					answer:"Even tiny amounts of cyanide could be lethal for Alex since they have a missense mutation in his rhodanese gene, which slows down cyanide metabolism."
				},
				{
					question: "I'm afraid you are mistaken. Chromosome 21 trisomy leads to Down's Syndrome. I don't think this explains his condition. Please let me work in peace unless you come up with a better idea", 
					answer:"Even tiny amounts of cyanide could be lethal for Alex since they have chromosome 21 trisomy, which is associated with cyanide sensitivity."
				},
				{
					question: "OK, I see, that's most interesting. But how was Alex exposed to cyanide?", 
					answer:"Even tiny amounts of cyanide could be lethal for Alex since they carry a rare GST polymorphism that is associated with altered cyanide metabolism.", 
					answers: [
						{	
							answer:"It was from the cyanobacteria in the Baltic Sea, which they were exposed to when swimming. (when they fell into the sea while collecting water samples.)",
							question: "“I'm afraid you are mistaken. Blue algae do not contain cyanide. Please let me work in peace unless you come up with a better idea"
						},
						{	
							answer:"It was from the cherry jam that they ate at the potluck dinner. Cherry kernels contain cyanide.",
							question: "Is that possible? Let me check …... Yes, you're right! Cherry kernels eaten in large amounts could cause cyanide poisoning. But are you sure Alex has a GST polymorphism? It's extremely rare!", 
							answers: [
								{
									question: "Alright...Please make sure of what you are saying!", 
									answer:"No, I'm not sure, but I guess it could explain things!"
								},
								{
									question: "Yes, you're absolutely right! Luckily, we are working on developing an experimental cure for cyanide poisoning and our very first batch of a new antidote is ready. We can give it to Alex straight away!", 
									answer:"Yes, I know because of the genetic screen Alex had done …"
								},
								{
									question: "I'm afraid you are mistaken. Insecticides for people do not have cyanide nowadays. Please let me work in peace unless you come up with a better idea", 
									answer:"No, I'm not sure. Perhaps Alex was just exposed to a large dose of cyanide through a combination of cherry jam, insect repellent and sea water."
								},
								{
									question: "That does not mean they have it!", 
									answer:"Yes, I'm sure, because Alex told me that the polymorphism is rather common among people in the village where they grew up.", 
								}
							]
						},
						{	
							answer:"It was from the cyanobacteria in the Baltic Sea, which they were exposed to when they threw sea water on to the hot stones in the sauna.",
							question: "I'm afraid you are mistaken. Although it's not a good idea to throw sea water to stones in sauna, cyanobacteria do not contain cyanide. Please let me work in peace unless you come up with a better idea"
						},
						{	
							question: "I'm afraid you are mistaken. Although cyanide was used in insecticides long time ago, they are now free of cyanide. Please let me work in peace unless you come up with a better idea",
							answer:"It was from the insect repellent that they sprayed over themselves to keep the ticks and mosquitoes away."
						}

					]
				}
			]},
		{
			answer:"I know what's wrong with Alex! They got bitten by a tick!", 
			question: "Which tick-borne disease do you mean?", 
			answers: [
				{
					question: "That cannot be right. Tick-borne diseases take longer time to develop. Please let me work in peace unless you come up with a better idea", 
					answer:"It's the Lyme disease! "
				},
				{
					question: "That cannot be right. Tick-borne diseases take longer time to develop. Please let me work in peace unless you come up with a better idea", 
					answer:"It's Tick-borne encephalitis!"
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
			answer:"I know what's wrong with Alex! They sprayed themselves with some dangerous insecticide!",	
			question: "An acute food poisoning? Interesting, were they the only person eating the fish?", 
			answers: [
				{
					answer:"No, we all had fish.",
					question: "Then I don't think eating fish has gotten Alex ill. If fish had gone bad others would have symptoms by now as well. Please let me work in peace unless you come up with a better idea"
				},
				{
					answer:"I can't recall. I'll have to check if there are photos of the barbeque…",
					question: "Bye then", 
				}
			]
		},
		{
			question: "Okay...bye", 
			answer:"Sorry! I got the wrong room!"
		}
	]
}
