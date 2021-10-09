const fs = require("fs")

module.exports = () => {
  const unknownNames = [
    ["Tucker & Dale vs. Evil", "Tucker and Dale vs. Evil"],
    ["IT", "It"],
    ["??? ??? (Angma-reul Boatda)", "악마를 보았다"],
    ["El Hoyo", "El hoyo"],
    ["Cannibal - Aus dem Tagebuch des Kannibalen", "Cannibal"],
    ["?????? ???? (Srpski Film)", "Srpski film"],
    ["The Eloise Asylum", "Eloise"],
    ["TAU", "Tau"],
    ["Rec", "[REC]"],
    ["Ich seh Ich seh", "Ich seh, Ich seh"],
    ["IT Chapter Two", "It Chapter Two"],
    ["Ver�nica", "Verónica"],
    ["The Descend", "The Descent"],
    ["???????. ??? (Gogol. Viy)", "Гоголь. Вий"],
    ["She's Just A Shadow", "She's Just a Shadow"],
    ["Den Blomstertid Nu Kommer", "Den blomstertid nu kommer"],
    ["Bed Of The Dead", "Bed of the Dead"],
    ["Die Pr�senz", "The Presence"],
    ["Curse Of The Nun", "Curse of the Nun"],
    ["Girl House", "GirlHouse"],
    ["?? (Eonni)", "No Mercy"],
    ["Verano rojo", "Verano Rojo"],
    ["Book of Fire", "The Book of Fire"],
    ["Les Affam�s", "Ravenous"],
  ]

  const csv = fs
    .readFileSync("FREUNDE_Filmliste_1.csv")
    .toString()
    .split("\n")
    .slice(7, -1)
    .map((movie) => movie.split(";"))

  for (const name of unknownNames) {
    csv[csv.findIndex((movie) => movie[1] === name[0])][1] = name[1]
  }

  const csvEdited = csv.map((movie) => movie.join(";")).join("\n")

  fs.writeFileSync("FREUNDE_Filmliste_1_EDITED.csv", csvEdited)
}
