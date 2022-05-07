import json
import speech_recognition as sr 
print ("")
rec_vocale = sr.Recognizer()
mic = sr.Microphone()
with mic as src:
     rec_vocale.adjust_for_ambient_noise(src)
     audio = rec_vocale.listen(src)
     texte= rec_vocale.recognize_google(audio, language="en-US")
     print(texte)
     #print(json.dumps(texte))
    
     with open('recodedaudio.mp3',"wb") as f:
          f.write(audio.get_wav_data())