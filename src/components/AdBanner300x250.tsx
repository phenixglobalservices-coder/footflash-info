import React from 'react';

export const AdBanner300x250: React.FC = () => {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '5d6dce57596e440f4d4611e0ab2dbda7',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highrevenueformat.com/5d6dce57596e440f4d4611e0ab2dbda7/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
        Partenaire Officiel (300x250)
      </span>
      <div className="w-[300px] h-[250px] overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center shadow-lg">
        <iframe
          title="Annonce 300x250"
          width="300"
          height="250"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          srcDoc={adHtml}
        />
      </div>
    </div>
  );
};
