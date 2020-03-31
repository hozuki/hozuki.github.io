(function() {
    var keyDownList = [];
    var pageEasterEggTriggered = false;
    // ↑↑↓↓←→←→BA
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    // 伪·strstr
    function inArray(src, cmp)
    {
        if (!src || !cmp || src.length <= 0 || cmp.length <= 0 || src.length < cmp.length)
        {
            return false;
        }
        var j;
        var i = 0;
        while (i <= src.length - cmp.length)
        {
            var atLeastMatchedOne = false;
            j = 0;
            while (j < cmp.length && i < src.length && cmp[j] == src[i])
            {
                i++;
                j++;
                atLeastMatchedOne = true;
            }
            if (j >= cmp.length)
            {
                // Contains
                return true;
            }
            if (!atLeastMatchedOne)
            {
                i++;
            }
        }
        return false;
    }
    
    function keyDownHandler(ev)
    {
        if (pageEasterEggTriggered)
        {
            return;
        }
        keyDownList.push(ev.keyCode);
        if (inArray(keyDownList, konamiCode))
        {
            document.title = "I don't play Konami games. - Uiharu Kazari";
            console.log("Seeing this and you will find it.");
            pageEasterEggTriggered = true;
            window.removeEventHandler("keydown", keyDownHandler);
        }
        while (keyDownList.length > konamiCode.length)
        {
            keyDownList.shift();
        }
    }
    
    window.addEventListener("keydown", keyDownHandler);
})();