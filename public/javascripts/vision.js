function processFaceImage(url) {
        // ********************************************
        // * Update or verify the following values. *
        // ********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "ca0dc81fe26b42a3a9d91dc45f8f26c7";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var face_params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };

        // Display the image.
        // var sourceImageUrl = document.getElementById("inputImage").value;
        // document.querySelector("#sourceImage").src = sourceImageUrl;
        // var sourceImageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/38/Arthur-miller.jpg";

        // Perform the REST API call for face API.
        $.ajax({
            url: uriBase + "?" + $.param(face_params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + url + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            // $("#responseTextArea").val(JSON.stringify(data, null, 2));
            alert(data);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

    function processEmotions(url) {
        var emotion_params = {
            outputStyle: "aggregate",
        };
        // emotions API
        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the 
            //   URL below with "westcentralus".
            url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(emotion_params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");

                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","53713daa08ca43b78c762bbd2007b4ea");
            },
            type: "POST",
            // Request body
            data: '{"url": url}',
        })
        .done(function(data) {
            alert(data);
        })
        .fail(function() {
            alert("error");
        });
    }
    // processFaceImage();
    // processEmotions();