'use strict'

const DEFAULT_SETTINGS = {
    userid: null,
    primary: '#7700bcff',
    primary_var: '#7700bc30',
    secondary: '#eeeeeea0',
    secondary_var: '#eeeeee',
    bgcolor: '#000000c0',
    bgimage: 'nice.jpg'
}

function loadQueryString() {
    $.urlParams = function(input) {
        let result = {}
        let params = input.match(/(?<=\?.*)(?<!#.*)[^?&#=]+=?[^&#]*/g)
        if (!params) params = []
        params.forEach(function (param) {
            const parts = param.match(/([^=]*)=?(.*)/)
            result[parts[1]] = parts[2]
        })
        return result
    }(window.location.href)
}

function nonEmpty(val) {
    return val && val != '0'
}

function sanitizeColor(color) {
    if (color.substr(0, 1) == 'r') {
        color = pSBC(0, color, 'c')
    } else if (color.substr(0, 1) != '#') {
        color = '#' + color
    }
    return color
}

function resetAlpha(color, alpha = '') {
  return color.substr(0,7) + alpha
}

function loadSettings(defaultParams, key = 'SETTINGS') {
    let params = JSON.parse(localStorage.getItem(key))
    if (params === null) params = {}
    params = Object.assign(params, $.urlParams)
    if ('reset' in $.urlParams) {
      localStorage.setItem(key, JSON.stringify($.urlParams))
      redirect()
    } else if ('set' in $.urlParams) {
      localStorage.setItem(key, JSON.stringify(params))
      redirect()
    }
    $.SETTINGS = Object.assign(defaultParams, params)
}

function calculateTheme(theme) {
    $.THEME = {}
    const keys = ['primary', 'secondary', 'bgcolor']
    keys.forEach(function (key) {
        $.THEME[key] = sanitizeColor(theme[key])
    })
    $.THEME.primary_var = resetAlpha($.THEME.primary, '30')
    $.THEME.primary = resetAlpha($.THEME.primary)
    $.THEME.secondary_var = resetAlpha($.THEME.secondary)
    $.THEME.bgimage = decodeURIComponent(theme.bgimage)
    $.THEME.COUNTDOWN = {
        circle_bg_color: pSBC(.67, $.THEME.secondary, $.THEME.bgcolor),
        time: {
            Days: { color: pSBC(0, $.THEME.primary, $.THEME.secondary_var) },
            Hours: { color: pSBC(.25, $.THEME.primary, $.THEME.secondary_var) },
            Minutes: { color: pSBC(.5, $.THEME.primary, $.THEME.secondary_var) },
            Seconds: { color: pSBC(.75, $.THEME.primary, $.THEME.secondary_var) }
        }
    }
}

function cssVariable(name, ...value) {
  const css = $(':root').get(0).style
  if (value.length == 0) {
    return css.getPropertyValue(name)
  } else {
    css.setProperty(name, value[0])
  }
}

function setTheme(theme) {
    cssVariable('--primary', theme.primary)
    cssVariable('--primary-var', theme.primary_var)
    cssVariable('--secondary', theme.secondary)
    cssVariable('--secondary-var', theme.secondary_var)
    cssVariable('--bgcolor', theme.bgcolor)
    cssVariable('--bgimage', "url('" + theme.bgimage + "')")

/*    $('#profile').css('background-color', theme.primary_var)
    $('#profile').css('box-shadow', '0 0 40px 20px ' + theme.primary_var)
    $('body').css('color', theme.secondary)
    $('body').css('background-image', 'linear-gradient(' + theme.bgcolor + ', ' + theme.bgcolor + '), url(\'' + theme.bgimage + '\')')

    $('#form').css('background-color', theme.primary_var)
    $('#form').css('box-shadow', '0 0 3em 1.5em ' + theme.primary_var)
    $('#form').css('border-color', theme.primary)

    $('input').css('background-color', theme.secondary_var)
    $('input').css('color', theme.primary)

    $('button').css('background-color', theme.primary)
    $('button').css('color', theme.secondary_var)

    $(':focus').css('outline', 'auto 5px ' + theme.primary)
    $('button:focus').css('outline', 'auto 5px ' + theme.secondary)

    $('input[type=range]').css('background-color', 'transparent')

    $('input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb, input[type=range]::-ms-thumb').css('background', theme.secondary)
    $('input[type=range]:focus::-webkit-slider-thumb, input[type=range]:focus::-moz-range-thumb, input[type=range]:focus::-ms-thumb').css('background', theme.primary)

    $('input[type=range]:focus::-webkit-slider-runnable-track, input[type=range]::-moz-range-track, input[type=range]::-ms-fill-lower, input[type=range]::-ms-fill-upper').css('background', theme.primary)*/
}

function setTitle(name) {
    if (name !== null) {
        $('title, #username').text(name)
    }
}

function setCountdown(total, remaining) {
    $('#face').attr('data-timer', remaining)
    COUNTDOWN = $('#face').TimeCircles(Object.assign($.THEME.COUNTDOWN, {
        total_duration: total,
        count_past_zero: false,
        animation: 'smooth',
        fg_width: 0.05,
        bg_width: 0.7
    }))
}

function reloadCountdown() {
    $.get(URL, {
            userid: $.SETTINGS.userid
        })
        .done(function(data) {
            const stringDates = data.match(/Date\(\d+\)/g)
            const startStamp = new Date(parseInt(stringDates[0].match(/\d+/g)[0]))
            const endStamp = new Date(parseInt(stringDates[1].match(/\d+/g)[0]))

            let remaining = endStamp.getTime() - new Date().getTime()
            let total = endStamp.getTime() - startStamp.getTime()
            remaining /= 1000
            total /= 1000

            if (COUNTDOWN) {
                if (COUNTDOWN.getTime() <= 0) {
                    COUNTDOWN.restart()
                }
                COUNTDOWN.addTime(remaining - COUNTDOWN.getTime())
            } else {
                setCountdown(total, remaining)
            }
        })
}

function redirect() {
    window.location.assign(window.location.href.replace(window.location.search,''))
}

$.fn.whenPressed = function (action, period) {
    function engine(action) {
        var performer = null
        var start = function(e) {
            e.preventDefault()
            action()
            performer = setInterval(action, period)
        }
        var end = function(e) {
          clearInterval(performer)
        }
        return [start, end]
    }

    var handlers = engine(action)

    this.on('touchstart mousedown', handlers[0])
    this.on('touchend mouseup', handlers[1])
}
