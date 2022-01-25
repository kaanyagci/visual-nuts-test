export interface Country {
    country: string,
    languages: string[]
}

interface AnalyserResult {nbCountries: number, mostPolyglotGermanSpeakerCountry: string, nbOfficialLaguages: number, mostPolyglotCountry: string, mostSpokenLanguages: string[]}

/**
 * Returns the number of countries from the given country list
 * @param countries The list of countries
 * @returns The number of countries in the list
 */
function getNumberOfCountries(countries: Country[]): number {
    return countries.length;
}

/**
 * finds the country with the most official languages, where they officially speak German
(de).
 * @param countries The list of countries
 * @param language The language that the country should speak
 * @returns The country with most official language and speaking a given language
 */
function getCountryWithMostOfficialLanguagesWith(countries: Country[], language: string = 'de'): Country|undefined {
    return getCountryWithHighestOfficialLanguages(countries.filter(c => c.languages.includes(language)));
}


/**
 * function counts all the official languages spoken in the listed countries
 * @param countries The list of countries
 * @returns The number of different languages spoken in these countries
 */
function countLanguages(countries: Country[]): number {
    return getLanguages(countries).size;
}


/**
 * Returns the country with highest number of official languages
 * @param countries The list of countries
 * @returns The Country with the most official languages. If there's more than one countries with the same number of official languages, it returns the first one in the list
 */
function getCountryWithHighestOfficialLanguages(countries: Country[]): Country|undefined {
    if (countries.length == 0) return undefined;
    return countries.reduce(
        (prev: Country, current: Country) => {
            if (prev.languages.length < current.languages.length) {
                return current;
            }
            return prev;
        },
        countries[0]
    );
}


/**
 * function finds the most common official language(s), of all countries.
 * @param countries The list of countries
 * @param languages The list of languages (optional)
 * @returns The list of languages most spoken in the given countries
 */
function mostCommonLanguages(countries: Country[], languages?: Set<String>): string[] {
    if (languages === undefined) {
        // If the languages set is not defined, initialise with the set of languages spoken in these countries
        languages = getLanguages(countries);
    }
    const languagesPerCountry: {language: string, count: number}[] = getLanguagesByNumberOfCountries(countries, languages);
    const maxCount: number = languagesPerCountry.reduce((p, c) => {
        if (p < c.count) {
            return c.count;
        }
        return p;
    }, 0);
    return languagesPerCountry.filter((l) => l.count === maxCount).map(l => l.language);
}

export function analyze(countries: Country[]): AnalyserResult {
    const mp = getCountryWithHighestOfficialLanguages(countries);
    const gsmp: Country|undefined =  (mp?.languages.includes('de')) ? mp : getCountryWithMostOfficialLanguagesWith(countries);
    return {
        nbCountries: getNumberOfCountries(countries),
        mostPolyglotGermanSpeakerCountry: gsmp === undefined ? '' : gsmp.country,
        nbOfficialLaguages: countLanguages(countries),
        mostPolyglotCountry: mp === undefined ? '' : mp.country,
        mostSpokenLanguages: mostCommonLanguages(countries, getLanguages(countries))
    };
}



/**
 * Get the set of official languages spoken in all countries
 * @private The use of this function is in the file level
 * @param countries The list of countries
 * @returns The set of official languages in all countries
 */
 function getLanguages(countries: Country[]): Set<String> {
    // remove duplicates in the languages array by converting it to a set
    return new Set<String>(
        countries
        // for each country get only the languages array
        .map(c => c.languages)
        // concatenate all the language arrays in a one array
        .reduce(
            (prev: string[], current: string[]) => {
                prev.push(...current);
                return prev;
            },
            []
        )
    );
}

/**
 * Get an array of each language and number of countries that spokes it
 * @private The use of this function is in the file level
 * @param countries The list of countries
 * @param languages The list of different languages spoken in all these countries
 * @returns The count of each language with number of spoken countries
 */
function getLanguagesByNumberOfCountries(countries: Country[], languages: Set<String>): {language: string, count: number}[] {
    const result: {language: string, count: number}[] = [];
    languages.forEach((language: String) => {
        result.push(
            {
                language: language.toString(),
                count:  countries.filter(c => c.languages.indexOf(language.toString()) !== -1).length
            }
        );
    });
    return result;
}