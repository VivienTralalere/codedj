define(function () {

    var musicLoops = [
        {
            loopName: 'G1_ARP1',
            source:   'G1/1 - ARP 1.wav'
        },
        {
            loopName: 'G1_BASS',
            source:   'G1/1 - BASS.wav'
        },
        {
            loopName: 'G1_SYNTH1',
            source:   'G1/1 - SYNTH 1.wav'
        },
        {
            loopName: 'G1_VOIX1',
            source:   'G1/1 - VOIX 1.wav'
        },
        {
            loopName: 'G1_2PIANO',
            source:   'G1/2 - PIANO.wav'
        }
    ]


    var sounds = [
        {
            soundName: 'G1_HITHAT',
            soundSource: 'G1/HH.wav'
        },
        {
            soundName: 'G1_KICK',
            soundSource: 'G1/KICK.wav'
        },
        {
            soundName: 'G1_RIM',
            soundSource: 'G1/RIM.wav'
        },
        {
            soundName: 'G1_SHAKER_1',
            soundSource: 'G1/SHAKER_1.wav'
        },
        {
            soundName: 'G1_SNARE',
            soundSource: 'G1/SNARE.wav'
        },
        {
            soundName: 'G1_TOM',
            soundSource: 'G1/TOM.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',

        'var hh = new Instrument("G1_HITHAT")',
        'var kick = new Instrument("G1_KICK")',
        'var rim = new Instrument("G1_RIM")',
        'var shaker1 = new Instrument("G1_SHAKER_1")',
        'var snare = new Instrument("G1_SNARE")',
        'var tom = new Instrument("G1_TOM")'
    ]

    var portions = [
        {
            solution: [
                '// La boucle for ne se répétait pas assez de fois. En utilisant 17 comme limite dans i<17, nous nous sommes assurés que le son s\'est joué à chaque temps, dans le bon rhytme.',
                'for (var i = 1; i < 17; i = i + 1)',
				'{',
				'    pattern.addSound(hh, i)',
				'}',
                '',
                'pattern.addSound(hh, 12.75)'
            ],
            base: [
				'// les boucles for permettent de ne pas avoir à répéter plein de fois la même sorte de ligne. Mais ici le for ne va pas assez loin. Essaie d\'utiliser un chiffre un peu plus grand que 12 dans i < 12',
                'for (var i = 1; i < 12; i = i + 1)',
				'{',
				'    pattern.addSound(hh, i)',
				'}',
                '',
                'pattern.addSound(hh, 12.75)'
            ]
        },
        {
            solution: [
                '// La boucle for ne se répétait pas assez de fois. En utilisant 14 comme limite dans i<14, nous nous sommes assurés que le son s\'est joué à chaque temps, dans le bon rhytme.',
				'for (var i = 1.75; i < 14; i = i + 4)',
				'{',
				'    pattern.addSound(kick, i)',
				'}',
                '',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 2.5)',
                'pattern.addSound(kick, 3.5)',
                'pattern.addSound(kick, 4.5)',
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 6.5)',
                'pattern.addSound(kick, 7.5)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 10.5)',
                'pattern.addSound(kick, 11.5)',
                'pattern.addSound(kick, 13)',
                'pattern.addSound(kick, 14.5)',
                'pattern.addSound(kick, 15.5)',
                'pattern.addSound(kick, 16.25)'
            ],
            base: [
                '// les boucles for permettent de ne pas avoir à répéter plein de fois la même sorte de ligne. Mais ici le for ne va pas assez loin. Essaie d\'utiliser un chiffre un peu plus grand que 8 dans i < 8',
                'for (var i = 1.75; i < 8; i = i + 4)',
				'{',
				'    pattern.addSound(kick, i)',
				'}',
                '',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 2.5)',
                'pattern.addSound(kick, 3.5)',
                'pattern.addSound(kick, 4.5)',
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 6.5)',
                'pattern.addSound(kick, 7.5)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 10.5)',
                'pattern.addSound(kick, 11.5)',
                'pattern.addSound(kick, 13)',
                'pattern.addSound(kick, 14.5)',
                'pattern.addSound(kick, 15.5)',
                'pattern.addSound(kick, 16.25)'
            ]
        },
        {
            solution: [
                '// La boucle for ne se répétait pas assez de fois. En utilisant 17 comme limite dans i<17, nous nous sommes assurés que le son s\'est joué à chaque temps, dans le bon rhytme.',
                'for (var i = 1; i < 17; i = i + 1)',
				'{',
				'    pattern.addSound(rim, i)',
				'}',
                '',
                'pattern.addSound(rim, 12.75)'
            ],
            base: [
                '// les boucles for permettent de ne pas avoir à répéter plein de fois la même sorte de ligne. Mais ici le for ne va pas assez loin. Essaie d\'utiliser un chiffre un peu plus grand que 11 dans i<11',
                'for (var i = 1; i < 11; i = i + 1)',
				'{',
				'    pattern.addSound(rim, i)',
				'}',
                '',
                'pattern.addSound(rim, 12.75)'
            ]
        },
        {
            solution: [
                '// La boucle for ne se répétait pas assez de fois. En utilisant 16 comme limite dans i<16, nous nous sommes assurés que le son s\'est joué à chaque temps, dans le bon rhytme.',
                'for (var i = 1.5; i < 16; i = i + 1)',
				'{',
				'    pattern.addSound(shaker1, i)',
				'}',
            ],
            base: [
                '// les boucles for permettent de ne pas avoir à répéter plein de fois la même sorte de ligne. Mais ici le for ne va pas assez loin. Essaie d\'utiliser un chiffre un peu plus grand que 10 dans i<10',
                'for (var i = 1.5; i < 10; i = i + 1)',
				'{',
				'    pattern.addSound(shaker1, i)',
				'}'
            ]
        },
        {
            solution: [
                '// La boucle for ne se répétait pas assez de fois. En utilisant 16 comme limite dans i<16, nous nous sommes assurés que le son s\'est joué à chaque temps, dans le bon rhytme.',
                'for (var i = 3; i < 16; i = i + 4)',
				'{',
				'    pattern.addSound(snare, i)',
				'}'
            ],
            base: [
                '// les boucles for permettent de ne pas avoir à répéter plein de fois la même sorte de ligne. Mais ici le for ne va pas assez loin. Essaie d\'utiliser un chiffre un peu plus grand que 10 dans i<10',
                'for (var i = 3; i < 10; i = i + 4)',
				'{',
				'    pattern.addSound(snare, i)',
				'}'
            ]
        },
        {
            solution: [
                '// Et voilà, ça marche avec le nombre changé!',
				'pattern.addSound(tom, 16.75)'
            ],
            base: [
                '//Respire ! Tu peux le faire. Juste un nombre à changer :)',
                'pattern.addSound(tom, 12.75)'
            ]
        }
    ]

    var end = [

    ]


    return {
        init: init,
        portions: portions,
        end: end,
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 2
    }


})
