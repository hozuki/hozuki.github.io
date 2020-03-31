(function() {
    if (typeof hljs === "object" && typeof hljs.initHighlightingOnLoad === "function") {
        hljs.initHighlightingOnLoad();
        
        // Fix "plain" blocks
        $("#main pre code").addClass("hljs");
    }
})();
