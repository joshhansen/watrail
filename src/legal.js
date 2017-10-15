function ArtInfo(license, creator, originalFilename) {
    this.license = license;
    this.creator = creator;
    this.originalFilename = originalFilename;
}

const PD = "Public Domain";
const CC_BY_20 = "Creative Commons Attribution 2.0";
const CC_BY_SA_40 = "Creative Commons Attribution-Share Alike 4.0";
const GFDL__CC_BY_SA_40 = "GNU Free Documentation License OR " + CC_BY_SA_40;

const licenses = {};

export const artCredits = {
    "flag.WA": new ArtInfo(PD, undefined, "1000px-Flag_of_Washington.svg.png"),
    Boise:     new ArtInfo(CC_BY_SA_40, "Boise,_idaho.jpg"),
    Salt_Lake_City: new ArtInfo(PD, "Splorticus", "1024px-Temple_Square_October_05_(8)_c.JPG"),
    Tremonton: new ArtInfo(GFDL__CC_BY_SA_40, "Bobjgalindo", "Tremonton_diner.JPG"),
    La_Grande: new ArtInfo(CC_BY_20, "Sam Beebe", "La_Grande_OR_-_aerial.jpg"),
    Pendleton: new ArtInfo(CC_BY_SA_30, "Visitor7", "1024px-Grain_Elevators_(Pendleton,_Oregon).jpg"),
    Hermiston: new ArtInfo(CC_BY_SA_40, "MIM1765", "1024px-395_Water_Tower.jpg")
};
