/*
  Copyright 2010 Jamie Love. All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are
  permitted provided that the following conditions are met:

     1. Redistributions of source code must retain the above copyright notice, this list of
        conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright notice, this list
        of conditions and the following disclaimer in the documentation and/or other materials
        provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY JAMIE LOVE ``AS IS'' AND ANY EXPRESS OR IMPLIED
  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
  FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JAMIE LOVE OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  The views and conclusions contained in the software and documentation are those of the
  authors and should not be interpreted as representing official policies, either expressed
  or implied, of Jamie Love.
*/

rnode.command.SummaryGeneral = RNodeCore.extend (rnode.command.CommandHandler, {
    canHandle: function (parsedCommand) {
        return parsedCommand.isFunction() && parsedCommand.getFunctionName().match('^summary.*$') != null;
    },

    execute: function (rApi, parsedCommand, userCallback, consolePrint) {
        // Always have the R server generate the text for this - to many summary commands exist.
        // to entertain the thought of doing it ourselves.
        var c = parsedCommand.get();
        if (c.search (/;\s*/) > -1)
            c = c.substr(0, c.length - 1);

        var wrappedCommand = "paste(capture.output(print(" + c + ")),collapse=\"\\n\")";
        var parsedWrappedCommand = rApi.parse (wrappedCommand);
        rApi.directlyExecute (parsedWrappedCommand, function (result, data) {
            userCallback (result, data);
        });
    }
});

rnode.command.CommandHandler.register (rnode.command.SummaryGeneral);

