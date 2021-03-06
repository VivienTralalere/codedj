define([
    'jquery',
    'toxilibs/event_bus_queued',
    'toxilibs/code_editor_capabilities',
    'toxilibs/ace_custom_javascript'
], function ($, globalEventBus, addCodeEditorCapabilities, aceCustomJavaScript) {

    var eventBus = globalEventBus('view')

    eventBus.on('html ready',  initDom)
    eventBus.on('world ready', initEditor)
    eventBus.on('user want to go next', function () {
        $('#btn_execute').removeClass('pause')
        $('#btn_next_question').addClass('invisible')
    })
    eventBus.on('user finish level', function () {
        $('#btn_next_question').removeClass('invisible')
    })

    var codeEditor = {}
    var initialCode
    var solutionCode
    var $textArea
    var $searchFieldButton



    globalEventBus('solutionWorld').on('world ready', function (world) {
        solutionCode = world.exposedCode()
    })



    /*
     TODO:  integration css function initDom () in comment
     */
    function initDom () {
        
        globalEventBus.on('change focus', function () {
            switchPlay()
        })
        
        initDomEvents()
        $('#editor').css({
            display: 'block'
        })

        $('#btn_next_question').addClass('invisible')

        /*$('#player_buttons').css({
            display: 'inline-block'
        })*/


        addCodeEditorCapabilities(codeEditor, {
            container: $('#code_editor'),
            content:   '',
            fontSize: 20,
            // onChange: onEditorChanges
        })

        aceCustomJavaScript({
            editor: codeEditor.aceEditor,
            words: {
                keywords: ['pattern', 'tempo'],
                functions: ['addSound']
            },
            style: {
                keywords: 'color: #FF987C',
                functions: 'color: rgb(203, 3, 183)'
            }
        })

        $searchFieldButton = $('<div id="btn_search"></div>')
        $('#code_editor').append($searchFieldButton)
        $searchFieldButton.click(openSearch)
    }

    function openSearch () {
        codeEditor.aceEditor.execCommand('find')
    }

    /*
     TODO:  integration css function initDomEvents ()  in comment
     */
    function initDomEvents () {
       // $('#btn_execute').on('click', runCode)
        $('#btn_reset').on('click', reset)
        //$('#btn_stop').on('click', stopLoop)
        $('#btn_solution').on('click', function () {
            codeEditor.setContent(solutionCode)
            runCode()
            eventBus.emit('user ask for solution')
        })

        $('#btn_next_question').on('click', function () {
            stopLoop()
            eventBus.emit('user want to go next')
        })

        $('#btn_execute').on('click', function () {
            if ($(this).hasClass('pause')) {
                $(this).removeClass('pause')
                runCode()
            } else {
                $(this).addClass('pause')
                stopLoop()
            }
        })

        $('#btn_save').click(function () {
            if (!isPopinOpen()) {
                showSavePopin()
            }
        })
        $('#btn_load').click(function () {
            if (!isPopinOpen()) {
                showLoadPopin()
            }
        })
        $('#mp3').click(function () {
            eventBus.emit('save sound')
        })
    }


    function isPopinOpen () {
        return $('.popin').length !== 0
    }


    function showSavePopin () {
        var popin = $('<div class="popin">Choisissez un nom de sauvegarde <input id="filename" type="text"><button id="save">Sauvegarder</button></div>')
        popin.append('<div class="closeBtn">x</div>')

        $('body').append(popin)

        $('#save').click(function () {
            saveCode($('#filename').val())
            closePopin()
        })
        $('.closeBtn').click(closePopin)
    }


    function showLoadPopin () {
        var popin = $('<div class="popin">Choisissez la sauvegarde à charger<br></div>')
        popin.append('<div class="closeBtn">x</div>')

        var select = $('<select id="saves"></select>')
        var saves = loadCodes()

        for (var i in saves) {
            select.append('<option values="' + i + '">' + i + '</option>')
        }

        popin.append(select)
        popin.append('<button id="load">Charger</button>')

        $('body').append(popin)

        $('#load').click(function () {
            var selected = $('#saves').find(':selected').text()
            codeEditor.setContent(saves[selected])
            closePopin()
        })

        $('.closeBtn').click(closePopin)
    }


    function closePopin () {
        $('.popin').remove()
    }


    function saveCode (fileName) {
        var data = JSON.parse(localStorage.getItem('tune') || '{}')
        data[fileName] = codeEditor.content()
        localStorage.tune = JSON.stringify(data)
    }


    function loadCodes () {
        return JSON.parse(localStorage.getItem('tune'))
    }


    function initEditor (world) {
        initialCode = world.exposedCode()
        codeEditor.setContent(initialCode)

    }    
    function switchPlay () {
        if ($('#btn_execute').hasClass('pause')) {
            $('#btn_execute').removeClass('pause')
            runCode()
        } else {
            $('#btn_execute').addClass('pause')
            stopLoop()
        }
    }

    var editorChangeTimeout

    // function onEditorChanges () {
    //     if (editorChangeTimeout) {
    //         clearTimeout(editorChangeTimeout)
    //     }
    //     editorChangeTimeout = setTimeout(runCode, 500)
    // }


    function runCode () {
        stopLoop()
        eventBus.emit('reset')
        eventBus.emit('code execution requested', codeEditor.content())
    }


    function stopLoop () {
        eventBus.emit('loop stop requested', {stopAll: true})
    }


    function reset () {
        codeEditor.setContent(initialCode)
        runCode()

    }

})
