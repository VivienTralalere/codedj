define([
    'jquery',
    'toxilibs/event_bus_queued',
    'music_timeline/music_timeline',
    'music_timeline/timeline_bar',
    'music_player/volume_view',
    'coding_world/core/timeline_tab',
    'perfectScrollbarJQuery'
], function ($, globalEventBus, Timeline, TimelineBar, initVolumeSlider, createTabConstructor) {


    //=============Variables=============

    var eventBus = globalEventBus('view')

    var $view
    var $endScreen
    var $viewApp
    var $world2
    var $tabContainer

    var patterns    = {}
    var timelines   = {}
    var tabsBySound = {}
    var defaultTimelineTab
    var lastSelectedTabName

    var timelineBar

    var Tab = createTabConstructor(eventBus)



    //=============Events=============

    eventBus.on('html ready',  init)
    eventBus.on('monde3',  worldThree)
    eventBus.on('world ready', clearView)
    eventBus.on('new pattern', addPattern)
    eventBus.on('ready to display notes', updateTimelines)
    eventBus.on('code execution requested', clearView)
    eventBus.on('patterns compared', displayEndScreen)
    eventBus.on('new tab', addTab)
    eventBus.on('add instrument to tab', associateInstrumentWithTab)
    eventBus.on('tab copied', replaceTab)
    eventBus.on('timeline tab changed', onTabChanged)



    //=============Initialization=============

    function init () {
        $view         = $('#view')
        $endScreen    = $('#end_screen')
        $viewApp      = $('#viewApp')
        $world2       = $('#world2')
        $tabContainer = $('#tabs_container')
        $('body').addClass('secondBack');
        $('.loader').addClass('invisible')
        $viewApp.empty()
        $viewApp.prepend($world2)
        if (!$('#mp3').hasClass('invisible')) {
            $('#mp3').addClass('invisible')
        }
        initDomEvents()

        timelineBar = new TimelineBar({
            container: $view,
            loopTime: 16 * 60 / 130 * 1000  //TODO: no magic number => (mesuresCount * beatPerMesure) * 60 / tempo * 1000
        })

        // defaultTimelineTab = new Tab()

        initVolumeSlider()

        eventBus.on('pattern beat played', launchTimelineBar)
        eventBus.on('loop stop requested', stopTimelineBar)
    }


    function initDomEvents () {
        $('.logoImg').on('click', function () {
            $('#viewApp').empty()
            window.location.href = '.?monde'
        })
        $('.btnPrevious').click(function () {
            parent.history.back()
            return false
        })
    }


    function worldThree(){
         $('#view').addClass('customHeightTimeline')
         $('#mp3').removeClass('invisible')
    }



    //=============Patterns=============

    function addPattern (pattern) {
        patterns[pattern.id] = $('<table class="pattern">')

        $view.append(patterns[pattern.id])
    }



    //=============Timelines=============

    function updateTimelines (notes) {
        for (var i in notes) {
            displayNote(notes[i])
        }
    }


    function displayNote (note) {
        var timeline = timelines[note.soundName() + note.pattern.id]
        if (!timeline) {
            timeline = addTimeline(note.soundName(), note.pattern)
            refreshTimelineBar()
        }

        timeline.displayNote({
            beat: note.start,
            class: htmlClass(note)
        })
    }


    function launchTimelineBar () {
        if (!timelineBar.moving) {
            timelineBar.play()
        }
    }


    function stopTimelineBar () {
        timelineBar.stop()
    }


    function refreshTimelineBar () {
        timelineBar.updateHeight()
        timelineBar.setStartOffset($('.timeline-container').find('th:visible:last').outerWidth(true))
    }


    function addTimeline (sampleName, pattern) {
        var timeline = new Timeline({
            sampleName: sampleName,
            beats: pattern.totalBeats(),
            container: patterns[pattern.id]
        })
        timelines[sampleName + pattern.id] = timeline

        addTimelineToTabs(sampleName, timeline)

        return timeline
    }



    //=============Tabs=============

    function addTab (tab) {
        $tabContainer.append(tab.view)
    }


    function replaceTab (params) {
        $tabContainer.find(params.old.view).remove()
    }


    function addTimelineToTabs (sampleName, timeline) {
        var tabsList = tabsBySound[sampleName]
        if (tabsList) {
            for (var index in tabsList) {
                var tab = tabsList[index]
                tab.addTimeline(timeline)
            }
        } else {
            defaultTimelineTab.addTimeline(timeline)
        }
    }


    function associateInstrumentWithTab (params) {
        for (var patternID in patterns) {
            var timeline = timelines[params.soundName + patternID]
            var tabsList = tabsBySound[params.soundName]

            if (tabsList) {
                tabsList.push(params.tab)
            } else {
                tabsBySound[params.soundName] = [params.tab]
            }

            if (timeline) {
                params.tab.addTimeline(timeline)
            }
        }
    }


    function onTabChanged (tab) {
        lastSelectedTabName = tab.name
        refreshTimelineBar()
    }





    //=============Others=============

    function htmlClass (note) {
        if (note.isCorrect) {
            return 'correct'
        }
        if (note.isSolutionNote) {
            return 'missing'
        }
        return 'wrong'
    }


    function displayEndScreen (codeHasErrors) {     //TODO: Display Win Screen
        if (codeHasErrors) {
            $endScreen.html('')
        } else {
            $endScreen.html('WIN')
        }
    }


    function clearView () {
        patterns    = {}
        timelines   = {}
        tabsBySound = {}
        $view.find('.pattern').remove()
        $tabContainer.find('.timeline-tab').remove()
        defaultTimelineTab = new Tab()
        if (lastSelectedTabName) {
            eventBus.emit('tab switch requested', lastSelectedTabName)
        }
    }

})
