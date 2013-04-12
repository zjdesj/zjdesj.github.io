(function () {
    $('#check input').each(function(i,e){
		if(i==0){
			e.checked = false;
		}else{
			e.checked = true;
		}
        $(e).bind('click',function(){
            if($(this).val() == 0){
                $(this).attr('value',i+1);
            }else{
                $(this).attr('value',0);
            }
        });
    });
	
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        tlog = document.getElementById("tlog"),
        slog = document.getElementById("slog"),
        alog = document.getElementById("alog"),
        input = document.getElementById("files"),
        drop_zone = document.getElementById('drop_zone');
    drop_zone.onclick = function () {
        document.getElementById('files').click();
        return false;
    };
    drop_zone.addEventListener('dragover', handle_drag_over, false);
    drop_zone.addEventListener('drop', handle_file_select, false);
    document.getElementById('files').addEventListener('change', handle_file_select, false);
    if (!("FileReader" in window) || !("File" in window) || !blobSlice) {
        registerLog("<p><strong>Your browser does not support the FileAPI or slicing of files.</strong></p>", "error");
    }
    if((typeof File !== 'undefined') && !File.prototype.slice) {
        if(File.prototype.webkitSlice) {
            File.prototype.slice = File.prototype.webkitSlice;
        }
        if(File.prototype.mozSlice) {
            File.prototype.slice = File.prototype.mozSlice;
        }
    }
    function handle_drag_over(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    function registerLog(str, className,flag,i) {
        var elem = document.createElement("div");
        elem.innerHTML = str;
        elem.className = "alert-message" + (className ? " "  + className : "");
        if(flag == "s"){
            $(slog).find('.groupdiv')[i].appendChild(elem);
        }else if(flag == "t"){
            $(tlog).find('.groupdiv')[i].appendChild(elem);
        }else {
            alog.appendChild(elem);
        }
    }

    function slow () {
        var ua = navigator.userAgent.toLowerCase();

        if (/chrome/.test(ua)) {
            if (location.protocol === "file:") {
                registerLog("<p><strong>This example will only work in chrome (in file:// protocol) if you start it up with -allow-file-access-from-files argument.</strong><br/>This is a security measure introduced in chrome, please <a target=\"_blank\" href=\"http://code.google.com/p/chromium/issues/detail?id=60889\">see</a>.</p>");
            }
        }
        else if (/firefox/.test(ua)) {
            var firebugEnabled = !!(window.console && (window.console.firebug || (console.exception && console.table)));
            if (firebugEnabled) registerLog("<p>接下来的一段时间，你会发现firefox卡屎了。那是因为你<strong>开启了firebug</strong>。<br/>关闭了firebug重试吧。^_^</p>");
        }
        else if (/opera/.test(ua)) {
            registerLog("<p><strong>关闭 DragonFly 可大大提升速度。</strong></p>");
        }
    }

    function handle_file_select(event){
        event.stopPropagation();
        event.preventDefault();
        clearLog();
        slow();
        var con = checkVal();
        if(con == 3){
            $('#slog').addClass('half');
            $('#tlog').addClass('half');
            doIncremental();
            doNormal()
        }else if(con == 2){
            doIncremental();
        }else if(con == 1){
            doNormal()
        }else{
            registerLog("<p><strong>总得选个方式把，不选我怎么算...</strong></p>");
        }
    }
    function doIncremental(event){
        if (input.files.length == 0) {
            registerLog("<strong>选择文件啊，干嘛呢！</strong><br/>");
            return;
        }
        for(var i=0;i<input.files.length;i++){
            (function(i){
                var elem = document.createElement("div");
                elem.setAttribute("class","groupdiv");
                slog.appendChild(elem);
                var fileReader= new FileReader(),
                    file = input.files[i],
                    chunkSize = 2097152,                           // read in chunks of 2MB
                    chunks = Math.ceil(file.size / chunkSize),
                    currentChunk = 0,
                    spark = new SparkMD5(),
                    time,
                    uniqueId = "chunk_" + (new Date().getTime()),
                    chunkId = null;

                fileReader.onload = function(e) {

                    if (currentChunk == 0) registerLog("正在读取第： <strong id=\"" + uniqueId + "\">" + (currentChunk + 1) + "</strong>块，共 <strong>" + chunks + "</strong>块。<br/>", "info","s",i);
                    else {
                        if (chunkId === null) chunkId = document.getElementById(uniqueId);
                        chunkId.innerHTML = currentChunk + 1;
                    }

                    spark.appendBinary(e.target.result);           // append binary string
                    currentChunk++;

                    if (currentChunk < chunks) {
                        loadNext();
                    }
                    else {
                        registerLog("<strong>文件读取完毕！</strong><br/>", "success","s",i);
                        registerLog("<strong>计算出的MD5:</strong> " + spark.end() + "<br/>", "success","s",i); // compute hash
                        registerLog("<strong>耗时:</strong> " + (new Date().getTime() - time) + "ms<br/>", "success","s",i);
                    }
                };

                fileReader.onerror = function() {
                    registerLog("<strong>**，哪出错了...</strong>", "error","s",i);
                };

                function loadNext() {
                    var start = currentChunk * chunkSize,
                        end = start + chunkSize >= file.size ? file.size : start + chunkSize;

                    fileReader.readAsBinaryString(blobSlice.call(file, start, end));
                };

                registerLog("<p></p><strong>分块读取</strong><br/>", "title","s",i);
                registerLog("<p></p><strong>文件： (" + file.name + ")</strong><br/>", "info","s",i);
                time = new Date().getTime();
                loadNext();
            })(i);
        }
    }

    function doNormal() {
        if (input.files.length == 0) {
            registerLog("<strong>选个文件吧，亲！</strong><br/>");
            return;
        }

        for(var i=0;i<input.files.length;i++){
            (function(i){
                var elem = document.createElement("div");
                elem.setAttribute("class","groupdiv");
                tlog.appendChild(elem);

                var fileReader = new FileReader(),
                    file = input.files[0],
                    time;

                fileReader.onload = function(e) {
                    registerLog("<strong>全文件加载完毕!</strong><br/>", "success","t",i);
                    registerLog("<strong>MD5：</strong> " + SparkMD5.hashBinary(e.target.result) + "<br/>", "success","t",i); // compute hash
                    registerLog("<strong>耗时：</strong> " + (new Date().getTime() - time) + "ms<br/>", "success","t",i);
                };

                fileReader.onerror = function(e) {
                    registerLog("<strong>ERROR:</strong> FileReader出错了。<br/>", "error","t",i);
                };

                registerLog("<strong>全文件读取</strong><br/>", "title","t",i);
                registerLog("<strong>文件名：(" + file.name + ")</strong><br/>", "info","t",i);
                time = new Date().getTime();
                fileReader.readAsBinaryString(file);
            })(i)
        }
    }

    function clearLog() {
        //var divs = document.querySelectorAll('.log');
       // for(var i =0;i<divs.length;i++){
       //     divs[i].getChildren().destroy();
       // }
        $('.log div').remove();
    }

    function checkVal(){
        var checkval = 0;
        $('#check input').each(function(i,e){
            checkval += parseInt($(e).val());
        });
        return checkval;
    }
}());
