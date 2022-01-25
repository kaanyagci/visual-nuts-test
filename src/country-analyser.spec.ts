import { analyze, Country } from "./country-analyser";

describe(' testing country analysis', () => {
    let countries: Country[];
    beforeAll(() => {
            countries = [
                {
                    country:"US",
                    languages: ["en"]
                },
                {
                    country:"BE",
                    languages: ["nl","fr","de"]
                },
                {
                    country:"NL",
                    languages: ["nl"]
                },
                {
                    country:"DE",
                    languages: ["de"]
                },
                {
                    country:"ES",
                    languages: ["es"]
                }
            ];
        }
    );

    it('check analysis result', () => {
        const result = analyze(countries);
        expect(result.nbCountries).toBe(5);
        expect(result.mostPolyglotGermanSpeakerCountry).toBe('BE'),
        expect(result.nbOfficialLaguages).toBe(5);
        expect(result.mostPolyglotCountry).toBe('BE');
        expect(result.mostSpokenLanguages).toContain('nl')
        expect(result.mostSpokenLanguages).toContain('de')
        expect(result.mostSpokenLanguages).toHaveLength(2)
    })

});