$("#submitLogs").click(function(e) {
    e.preventDefault();
    removeLogsFromAllLogs();
    $.ajax({
        url: "/optimalRoute/calculate",
        type: "POST",
        dataType: 'json',
        data: {
            "logs" : JSON.stringify(allLogs)
        },
        success: function(response) {
            revalidateTextArea()
            if (jQuery.isEmptyObject(response)) return;
            updateLogsPanel(response, true);
            updateMapCanvas(response);
        }
    });
});

$('.logsAdd').click(function(e) {
    $.ajax({
        url: "/optimalRoute/parse",
        type: "POST",
        dataType: 'json',
        data: {
            "inputLogs": $("#inputLogs").val()
        },
        success: function(response) {
            formAreaToDefault();
            if (jQuery.isEmptyObject(response)) return;
            $('.logsWrapperPanel').show();
            updateLogsPanel(response, false);
        }
    });
});

$('.logsReset').click(function(e) {
    e.preventDefault();
    revalidateLogsPanel();
    $('.logsWrapperPanel').hide();
    repaint(canvasPanel);
    revalidateTextArea()
});


$('.chatLogs').on('input', function(e) {
    resizeTextArea(this);
    if (/^\s*$/.test($(this).val())) return;
});

$('.chatLogs').on('keydown', function(e) {
    var ctrl = e.ctrlKey ? e.ctrlKey : ((e.keyCode === 17) ? true : false);
    if (e.keyCode === 86 && ctrl || e.keyCode === 67 && ctrl || e.keyCode === 88 && ctrl) {
        return true;
    } else {
        return false;
    }
});

function revalidateTextArea() {
    $("#inputLogs").val('');
    resize(document.getElementById("inputLogs"));
}

function resizeTextArea(textArea) {
    textArea.style.height = '';
    textArea.style.height = textArea.scrollHeight + 'px';
}
