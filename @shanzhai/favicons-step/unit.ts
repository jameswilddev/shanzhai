import * as favicons from "favicons";
import { UnkeyedStore, Effect, Input, Output } from "@shanzhai/interfaces";
import { FaviconsStep } from ".";

describe(`FaviconsStep`, () => {
  const unkeyedStore: UnkeyedStore<unknown> = {
    type: `unkeyedStore`,
    name: `Test Unkeyed Store`,
    get: jasmine.createSpy(`unkeyedStore.get`).and.callFake(fail),
    set: jasmine.createSpy(`unkeyedStore.set`).and.callFake(fail),
  };

  const faviconEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const faviconEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const faviconEffectC: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const optionsEffectA: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  const optionsEffectB: Effect = {
    type: `unkeyedStoreSet`,
    unkeyedStore,
  };

  describe(`on construction`, () => {
    let faviconGet: jasmine.Spy;
    let favicon: Input<Buffer>;
    let optionsGet: jasmine.Spy;
    let options: Input<favicons.FaviconOptions>;
    let htmlHeadersSet: jasmine.Spy;
    let htmlHeaders: Output<string>;
    let filesSet: jasmine.Spy;
    let files: Output<Record<string, string | Buffer>>;
    let faviconsStep: FaviconsStep;

    beforeAll(() => {
      faviconGet = jasmine.createSpy(`faviconGet`);
      favicon = { get: faviconGet };
      optionsGet = jasmine.createSpy(`optionsGet`);
      options = { get: optionsGet };
      htmlHeadersSet = jasmine.createSpy(`htmlHeadersSet`);
      htmlHeaders = {
        set: htmlHeadersSet,
        effects: [faviconEffectA, faviconEffectB, faviconEffectC],
      };
      filesSet = jasmine.createSpy(`filesSet`);
      files = { set: filesSet, effects: [optionsEffectA, optionsEffectB] };

      faviconsStep = new FaviconsStep(
        `Test Name`,
        favicon,
        options,
        htmlHeaders,
        files
      );
    });

    it(`exposes its name`, () => {
      expect(faviconsStep.name).toEqual(`Test Name`);
    });

    it(`exposes the outputs' effects`, () => {
      expect(faviconsStep.effects).toEqual([
        faviconEffectA,
        faviconEffectB,
        faviconEffectC,
        optionsEffectA,
        optionsEffectB,
      ]);
    });

    it(`exposes its favicon input`, () => {
      expect(faviconsStep.favicon).toBe(favicon);
    });

    it(`does not read from its favicon input`, () => {
      expect(faviconGet).not.toHaveBeenCalled();
    });

    it(`exposes its options input`, () => {
      expect(faviconsStep.options).toBe(options);
    });

    it(`does not read from its options input`, () => {
      expect(optionsGet).not.toHaveBeenCalled();
    });

    it(`exposes its HTML header output`, () => {
      expect(faviconsStep.htmlHeaders).toBe(htmlHeaders);
    });

    it(`does not write to its HTML header output`, () => {
      expect(htmlHeadersSet).not.toHaveBeenCalled();
    });

    it(`exposes its file output`, () => {
      expect(faviconsStep.files).toBe(files);
    });

    it(`does not write to its file output`, () => {
      expect(filesSet).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let faviconGet: jasmine.Spy;
    let favicon: Input<Buffer>;
    let optionsGet: jasmine.Spy;
    let options: Input<favicons.FaviconOptions>;
    let htmlHeadersSet: jasmine.Spy;
    let htmlHeaders: Output<string>;
    let filesSet: jasmine.Spy;
    let files: Output<Record<string, string | Buffer>>;
    let faviconsStep: FaviconsStep;

    beforeAll(async () => {
      faviconGet = jasmine
        .createSpy(`faviconGet`)
        .and.resolveTo(
          Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="red"/><stop offset="37.5%" stop-color="#ff0"/><stop offset="50%" stop-color="#0f0"/><stop offset="62.5%" stop-color="#0ff"/><stop offset="100%" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/></svg>`
          )
        );
      favicon = { get: faviconGet };
      optionsGet = jasmine.createSpy(`optionsGet`).and.resolveTo({
        path: `Test Path`,
        appName: `Test App Name`,
        appShortName: `Test App Short Name`,
        appDescription: `Test App Description`,
        developerName: `Test Developer Name`,
        developerURL: `Test Developer URL`,
        dir: `Test Dir`,
        lang: `fr-BE`,
        background: `magenta`,
        theme_color: `yellow`,
        appleStatusBarStyle: "black-translucent",
        display: "minimal-ui",
        orientation: `landscape`,
        scope: `Test Scope`,
        start_url: `Test Start Url`,
        version: `Test Version`,
        logging: false,
        pipeHTML: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        manifestRelativePaths: false,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: false,
          firefox: false,
          windows: false,
          yandex: true,
        },
      });
      options = { get: optionsGet };
      htmlHeadersSet = jasmine.createSpy(`htmlHeadersSet`).and.resolveTo();
      htmlHeaders = {
        set: htmlHeadersSet,
        effects: [faviconEffectA, faviconEffectB, faviconEffectC],
      };
      filesSet = jasmine.createSpy(`filesSet`).and.resolveTo();
      files = { set: filesSet, effects: [optionsEffectA, optionsEffectB] };
      faviconsStep = new FaviconsStep(
        `Test Name`,
        favicon,
        options,
        htmlHeaders,
        files
      );

      await faviconsStep.execute();
    });

    it(`exposes its name`, () => {
      expect(faviconsStep.name).toEqual(`Test Name`);
    });

    it(`exposes the outputs' effects`, () => {
      expect(faviconsStep.effects).toEqual([
        faviconEffectA,
        faviconEffectB,
        faviconEffectC,
        optionsEffectA,
        optionsEffectB,
      ]);
    });

    it(`exposes its favicon input`, () => {
      expect(faviconsStep.favicon).toBe(favicon);
    });

    it(`reads from its favicon input once`, () => {
      expect(faviconGet).toHaveBeenCalledTimes(1);
    });

    it(`exposes its options input`, () => {
      expect(faviconsStep.options).toBe(options);
    });

    it(`reads from its options input once`, () => {
      expect(optionsGet).toHaveBeenCalledTimes(1);
    });

    it(`exposes its HTML header output`, () => {
      expect(faviconsStep.htmlHeaders).toBe(htmlHeaders);
    });

    it(`writes to its HTML header output once`, () => {
      expect(htmlHeadersSet).toHaveBeenCalledTimes(1);
    });

    it(`writes the expected HTML headers`, () => {
      expect(htmlHeadersSet).toHaveBeenCalledWith(
        `<link rel="yandex-tableau-widget" href="Test%20Path/yandex-browser-manifest.json">`
      );
    });

    it(`exposes its file output`, () => {
      expect(faviconsStep.files).toBe(files);
    });

    it(`writes to its file output once`, () => {
      expect(filesSet).toHaveBeenCalledTimes(1);
    });

    it(`writes the expected files headers`, () => {
      expect(filesSet).toHaveBeenCalledWith({
        "yandex-browser-manifest.json": JSON.stringify(
          {
            version: `Test Version`,
            api_version: 1,
            layout: {
              logo: `Test%20Path/yandex-browser-50x50.png`,
              color: `magenta`,
              show_title: true,
            },
          },
          null,
          2
        ),
        "yandex-browser-50x50.png": Buffer.from(
          `89504e470d0a1a0a0000000d49484452000000320000003208060000001e3f88b100000437494441547801d5c141ae1dd51100d053fd9a5bb267e06e2b194562c44e58038bcb3eb211a430c902e83630b25597ff5ec5f8478a104a8484847e9f133db4442291480c24128981442291480c24120389442231904824128981a493487a2089e4fdcad19c38821307dee1c48103270efc60b14a24128981814462602091480c0c0c241203894422319048241289814412490f2291bc5f3970e00c0e9c3871e2c08913dfe3478b872fac1289c4c0c0c0c040626060602091480c0c2412898181442291480c24124927069dbc5f399a0367703447f00e074e1c3871e0278b87cfb15b2512037fff075f7e457d6059080402814020100804028105814020100804028140201044d041367fc5dbe0dedc833beeb8e38e9f3d0caf7ceb3b5ffb066fb159250606befc8abffccd9f29d08866c51a6884ffebc98a1d1b76abc4c0407df0c9d313cbe277097f4823d03e0a34c2afb4ff7a7858ad3e98d8b061b71a480c2c8b4f968565f16708cfc27f84df08bfb5f80c3b766c5689c440b8901b366c7863911848840bb961c786dd2a3130102e203cbbe10d366c16038944b8901bbd63a777ab4462205c47df889ddeb059251203e11a1a71a33762c76e9118488497af11e81b76ec3cbdb64a0c24c2cb17681fdd889da7d7545b250612e1e56bcfe2c6d36b0ac5622031109e85172c88a683423533ac12898170018da09b8919545b250612e102c2271d140a15160389c4e23a1a8542b1482412e13a1a85c26491480c84eb6814268a55223110aea331512816898144b88e46a1502c061289701d8d42a158241289701d8d42a158241289701d8d4261b2482412e13a1a85896295480c84eb6814268a45622011aea331512816038944b88e46a1502c128944b88e070a85c9d289a4930e9fb40b6814268a35921e1844d00817d0284c144b0f229174104d7bc1dab3c64461b24824ef57eeed5978f91a8542b144f27ee568ee3e0ab497af512814cbfb950307ee814678f91a8589623d9a0367706f846b6814268af5c4191ccd3d5c47a33051ac4770e008ee2ea45198982c274ebcc3ddb376018d8942b11c3871e0ee421a8589627d871327ee2ea4519828d613070efcece1170f0fbf167ea511681f051ae10f69bfcbe3c1b2f078a03031590f9c3831bcf28bd5ea7f6a04dab368843f2cfc2ecbe2935789c2c4643d70e2c0b7bef364f5c1b4f80c37dc70c38dbe1137fa861b71a3836e3a68341a8d46a3d168341a8d071a8d46a3d168341a8d46f378f02af9e7bf303151ac27bec74f165ffb063b36ecd8b0e30dbd133bbd6127769e5e53cd44a150284c140a8542a1305128140a138542a150284c140a85c2c444a1580ffc68f1f039de62c3861d1b366cc44e6fc48e9da7d714aa9941a1509828140a85c2c444a150989828140a1313131385898989898942a1587fb078f8023b36ecd8b1e10d766cf48e0d3b4fafa9a630836a2a284c140a854261a2502814260a8589898942a1303151284c4c140a85e2dfeec7d47f673fe7740000000049454e44ae426082`,
          `hex`
        ),
      });
    });
  });
});
