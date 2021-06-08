addLayer("t", {
    name: "Tower", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Tree Power", // Name of prestige currency
    baseResource: "EXP", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    canBuyMax() { return hasUpgrade("t", 11) },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
    11: {
		title: "Begin Testing",
		description: "Allows for EXP gain.",
		cost: new Decimal(1),
	},
    12: {
		title: "Multi Attack",
		description: "Doubles EXP gain.",
		cost: new Decimal(3),
        unlocked() { return hasUpgrade("t", 11) },
	},
    13: {
		title: "Auto Level",
		description: "Automatically converts your EXP into tree power whenever possible.",
		cost: new Decimal(5),
        unlocked() { return hasUpgrade("t", 12) },
	},
    14: {
		title: "Power Cannon",
		description: "Tree power increases EXP gain.",
		cost: new Decimal(5),
        effect() {
            return player[this.layer].points.add(1).pow(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked() { return hasUpgrade("t", 12) },
	},
    },

})
addLayer("e", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#4BDC13",
    requires: new Decimal(7), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of prestige currency
    baseResource: "Tree Power", // Name of resource prestige is based on
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "G: Reset for Energy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){ return hasUpgrade("t", 14) },
    upgrades: {
   
    },

})
