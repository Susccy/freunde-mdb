const fs = require("fs")

module.exports = () => {
  const unknownNames1 = [
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

  const csv1 = fs
    .readFileSync("FREUNDE_Filmliste_1.csv")
    .toString()
    .split("\n")
    .slice(7, -1)
    .map((movie) => movie.split(";"))

  for (const name of unknownNames1) {
    csv1[csv1.findIndex((movie) => movie[1] === name[0])][1] = name[1]
  }

  const csvEdited1 = csv1.map((movie) => movie.join(";")).join("\n")

  fs.writeFileSync("FREUNDE_Filmliste_1_EDITED.csv", csvEdited1)

  const unknownNames2 = [
    ["Cube²: Hypercube", "Cube 2: Hypercube"],
    ["Spiders 3D", "Spiders"],
    ["JeruZalem", "Jeruzalem"],
    ["Fear Dot Com", "FearDotCom"],
    ["Wyrmwood", "Wyrmwood: Road of the Dead"],
    ["Nightfare", "Night Fare"],
    ["The VVitch: A New-England Folktale", "The Witch"],
    ["Backcountry - Gnadenlose Wildnis", "Backcountry"],
    ["Devyataya", "Девятая"],
    [
      "Pirates of the Caribbean: Dead Man’s Chest",
      "Pirates of the Caribbean: Dead Man's Chest",
    ],
    ["Fear Street Part One: 1994", "Fear Street: 1994"],
    ["Fear Street Part Two: 1978", "Fear Street: 1978"],
    ["Fear Street Part Three: 1666", "Fear Street: 1666"],
    ["Freitag der 13.", "Friday the 13th"],
    ["Halloween H20: Twenty Years Later", "Halloween H20: 20 Years Later"],
  ]

  const csv2 = fs
    .readFileSync("FREUNDE_Filmliste_2.csv")
    .toString()
    .split("\n")
    .slice(6, -1)
    .map((movie) => movie.split(";"))

  for (const name of unknownNames2) {
    csv2[csv2.findIndex((movie) => movie[0] === name[0])][0] = name[1]
  }

  const csvEdited2 = csv2.map((movie) => movie.join(";")).join("\n")

  fs.writeFileSync("FREUNDE_Filmliste_2_EDITED.csv", csvEdited2)
}
