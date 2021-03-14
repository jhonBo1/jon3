case "play":
            if(args.length === 1) return client.reply(from,erroComandoMsg(command),id)
            servicos.obterInfoVideo(body.slice(6)).then(play_video =>{
                if(play_video == null) return client.reply(from,msgs_texto.utilidades.play.nao_encontrado,id)
                if(play_video.duration > 300000) return client.reply(from,msgs_texto.utilidades.play.limite,id)
                let play_espera = preencherTexto(msgs_texto.utilidades.play.espera,play_video.title,play_video.durationFormatted)
                client.reply(from,play_espera,id)
                servicos.obterYtMp3(play_video).then(mp3_path =>{
                    client.sendFile(from, mp3_path, "musica.mp3","", id).then(()=>{
                        fs.unlinkSync(mp3_path)
                    })
                }).catch(err=>{
                    client.reply(from,err.message,id)
                })
            }).catch(err=>{
                client.reply(from,err.message,id)
            })
            break